// サインアップ
export interface SignUpParams {

  name: string
  email: string
  password: string
  passwordConfirmation: string
  patientOrDoctor: boolean | undefined
  sex: boolean | undefined
  // patient
  // patientProfile: PatientParams

}

// export interface PatientParams {
//   // patient
//   roomNumber: number
//   phoneNumber: string
//   emergencyAddress: string
//   address: string
//   building: string
// }

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
