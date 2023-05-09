export enum EnumResponse {
    DATA_EXISTS = -1
    , VALIDATE_ERROR = 0
    , SUCCESS = 1
  }
  
  export enum EnumMPLSystem {
    WB_MPI = 'WB_MPI'
    , WB_ENT = 'WB_ENT'
    , WB_TMS = 'WB_TMS'
    , DEFAULT = WB_TMS
  }
  
  export enum EnumLanguage {
    ENGLISH = <any>'EN'
    , VIETNAMESE = <any>'VN'
    , KOREAN = <any>'KO'
    , DEFAULT = ENGLISH
  }