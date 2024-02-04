import { useTranslation } from "react-i18next";
import { ErrorLeftcenterdMassage } from "./styled/ErrorMassage";
import { scaleMini, scaleReal } from "../models/ScaleClass";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  StyledSpanGoldText,
  StyledSpanText,
  StyledTextBold,
} from "./styled/Text";
import {
  StyledLabelText,
  StyledRadioInput,
  StyledTextInputHoleRow,
  StyledsScaleText,
} from "./styled/Form";
import { StyledButtonInspirationviewComment } from "./styled/Buttons";

export const ScaleCalculator = () => {
  const { t } = useTranslation();
  const [errorRealMessage, seterrorRealMessage] = useState("");
  const [errorMiniMessage, seterrorMiniMessage] = useState("");
  const checkNumber = new RegExp(/^[0-9]/);
  const checkNumberErrorMessage = t("checkNumberErrorMessage");

  ///////////////////////////////////////////////////////////////////////
  ///////////////// Real to dolls ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  const [scaleRealData, setScaleRealData] = useState<scaleReal>({
    selectedRealScale: 12,
    selectedRealMeasure: "",
  });

  const [RealResult, setRealResult] = useState<string>("");
  const [scaleShowRealMessage, setscaleShowRealMessage] =
    useState<boolean>(false);

  const handleRealChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setScaleRealData({ ...scaleRealData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setScaleRealData({ ...scaleRealData, [name]: +e.target.value });
    }
    if (e.target.type === "radio") {
      setScaleRealData({ ...scaleRealData, [name]: +e.target.value });
    }
  };

  const handleRealSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (checkNumber.test(scaleRealData.selectedRealMeasure)) {
      const realNumber = Number(scaleRealData.selectedRealMeasure);
      setRealResult((realNumber / scaleRealData.selectedRealScale).toFixed(2));
      setscaleShowRealMessage(true);
      seterrorRealMessage("");
    } else {
      seterrorRealMessage(checkNumberErrorMessage);
      setscaleShowRealMessage(false);
    }
  };

  ///////////////////////////////////////////////////////////////////////
  ///////////////// Dolls to Real ///////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  const [scaleMiniData, setScaleMiniData] = useState<scaleMini>({
    selectedMiniScale: 12,
    selectedMiniMeasure: "",
  });

  const [MiniResult, setMiniResult] = useState<string>("");
  const [scaleShowMiniMessage, setscaleShowMiniMessage] =
    useState<boolean>(false);

  const handleMiniChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setScaleMiniData({ ...scaleMiniData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setScaleMiniData({ ...scaleMiniData, [name]: +e.target.value });
    }
    if (e.target.type === "radio") {
      setScaleMiniData({ ...scaleMiniData, [name]: +e.target.value });
    }
  };

  const handleMiniSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (checkNumber.test(scaleMiniData.selectedMiniMeasure)) {
      const miniNumber = Number(scaleMiniData.selectedMiniMeasure);
      setMiniResult((miniNumber * scaleMiniData.selectedMiniScale).toFixed(2));
      setscaleShowMiniMessage(true);
      seterrorMiniMessage("");
    } else {
      seterrorMiniMessage(checkNumberErrorMessage);
      setscaleShowMiniMessage(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleRealSubmit}>
          <div>
            <StyledTextBold>{t("scaleRealHeader")}</StyledTextBold>
            <StyledLabelText>{t("scaleRealLabeltext")}</StyledLabelText>
            <StyledTextInputHoleRow
              value={scaleRealData.selectedRealMeasure}
              type="text"
              onChange={handleRealChange}
              name="selectedRealMeasure"
            />
            <ErrorLeftcenterdMassage>
              {errorRealMessage}
            </ErrorLeftcenterdMassage>
            <StyledsScaleText>{t("scaleRealLabeltext")}</StyledsScaleText>
            <div>
              <StyledLabelText>
                <StyledRadioInput
                  value={12}
                  type="radio"
                  onChange={handleRealChange}
                  name="selectedRealScale"
                />
                {t("scaleOption1")}
              </StyledLabelText>
              <StyledLabelText>
                <StyledRadioInput
                  value={18}
                  type="radio"
                  onChange={handleRealChange}
                  name="selectedRealScale"
                />
                {t("scaleOption2")}
              </StyledLabelText>
            </div>
          </div>
          <StyledButtonInspirationviewComment>
            {t("scaleBtnText")}
          </StyledButtonInspirationviewComment>
        </form>
        {scaleShowRealMessage == true && (
          <StyledSpanText>
            {" "}
            {t("scaleMessage")}{" "}
            <StyledSpanGoldText> {RealResult} </StyledSpanGoldText>{" "}
            {t("scaleMessage2")}
          </StyledSpanText>
        )}
        <div
          style={{
            backgroundColor: "#C7A440",
            width: "80%",
            height: "2px",
            margin: "20px",
          }}
        ></div>
        <form onSubmit={handleMiniSubmit}>
          <div>
            <StyledTextBold>{t("scaleMiniHeader")}</StyledTextBold>
            <StyledLabelText>{t("scaleMiniLabeltext")}</StyledLabelText>
            <StyledTextInputHoleRow
              value={scaleMiniData.selectedMiniMeasure}
              type="text"
              onChange={handleMiniChange}
              name="selectedMiniMeasure"
            />
            <ErrorLeftcenterdMassage>
              {errorMiniMessage}
            </ErrorLeftcenterdMassage>
            <StyledsScaleText>{t("scaleRealLabeltext")}</StyledsScaleText>
            <div>
              <StyledLabelText>
                <StyledRadioInput
                  value={12}
                  type="radio"
                  onChange={handleMiniChange}
                  name="selectedMiniScale"
                />
                {t("scaleOption1")}
              </StyledLabelText>
              <StyledLabelText>
                <StyledRadioInput
                  value={18}
                  type="radio"
                  onChange={handleMiniChange}
                  name="selectedMiniScale"
                />
                {t("scaleOption2")}
              </StyledLabelText>
            </div>
          </div>
          <StyledButtonInspirationviewComment>
            {t("scaleBtnText")}
          </StyledButtonInspirationviewComment>
        </form>
        {scaleShowMiniMessage == true && (
          <StyledSpanText>
            {" "}
            {t("scaleMessage")}{" "}
            <StyledSpanGoldText> {MiniResult} </StyledSpanGoldText>{" "}
            {t("scaleMessage2")}
          </StyledSpanText>
        )}
      </div>
    </>
  );
};
