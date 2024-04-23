import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadExcel } from "./features/uploads/asyncAction";
import LoginLoading from "./components/Loading/LoginLoading";
import ErrorsInfo from "./components/ErrorsInfo";
import TempsInfo from "./components/TempsInfo";
import { toastifyInfo } from "./helpers/toastify";
import MatchKeys from "./components/MatchKeys";
import { matchesExcel } from "./features/matches/asyncAction";

function App() {
  const [excel, setExcel] = useState();
  const [show, setShow] = useState(false);

  const { loading } = useSelector((state) => state.upload);
  const excelData = useSelector((state) => state.upload.uploadData);
  const { matches } = useSelector((state) => state.matches);

  const [matchesData, setMatchesData] = useState({});

  const [errors, setErrors] = useState([]);
  const [temps, setTemps] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setMatchesData(matches);
  }, [matches]);

  useEffect(() => {
    setErrors(excelData.errors);
  }, [excelData.errors]);

  useEffect(() => {
    setTemps(excelData.temps);
  }, [excelData.temps]);

  const sendFileToTest = async () => {
    if (!excel) {
      toastifyInfo("Herhangi bir dosya seçmelisiniz !!");
      setShow(false);
    } else {
      const formData = new FormData();

      formData.append("file", excel);
      dispatch(matchesExcel(formData));
    }
  };
  const matchesKey = async (matchesColumns) => {
    console.log("matchesColumns", matchesColumns);
    dispatch(
      uploadExcel({ matches: matchesColumns, fileName: matches.fileName })
    );
    setShow(true);
  };

  if (loading) {
    return <LoginLoading />;
  }
  return (
    <div className="container">
      {!show && (
        <div className="upload">
          <input
            type="file"
            multiple={false}
            onChange={(e) => {
              setExcel(e.target.files[0]);
            }}
          />
          <button onClick={sendFileToTest}>Kontrol Et Kayıt</button>
        </div>
      )}

      <MatchKeys submit={matchesKey} matchesData={matchesData} />

      {excel && show && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "30px",
          }}
        >
          <ErrorsInfo errors={errors} />
          <TempsInfo src={temps} />
        </div>
      )}
    </div>
  );
}

export default App;
