import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { SignUpParams } from "interfaces/index"

// ラジオボタン
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  rowBox: {
    display: "flex",
    justifyContent: "space-around"
  }
}))

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  // user
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [patientOrDoctor, setPatientOrDoctor] = useState<boolean>()
  const [sex, setSex] = useState<boolean>()
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  // ボタンの許可
  const [buttonDisAllow, setButtonDisAllow] = useState<boolean>(true)

  useEffect(() => {
    if (
      patientOrDoctor !== undefined &&
      name !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirmation === password &&
      sex !== undefined
    ) {
      setButtonDisAllow(false)
    } else {
      setButtonDisAllow(true)
    }
  }, [patientOrDoctor, sex, name, email, password, passwordConfirmation])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      patientOrDoctor: patientOrDoctor,
      sex: sex
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  // ラジオボタン 値をbooleanに変える
  const handlePatientOrDoctorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatientOrDoctor(event.target.value === "true");
  };
  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSex(event.target.value === "true");
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="サインアップ" />
          <CardContent>
            <div className={classes.rowBox}>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                onChange={handlePatientOrDoctorChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="患者様"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="医療従事者"
                />
              </RadioGroup>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                onChange={handleSexChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="男性"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="女性"
                />
              </RadioGroup>
            </div>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワードを再入力してください"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={buttonDisAllow}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              サインアップ
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="入力した値に誤りがあります。"
      />
    </>
  )
}

export default SignUp
