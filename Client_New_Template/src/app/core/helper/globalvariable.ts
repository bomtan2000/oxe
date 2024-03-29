import { Injectable, ɵConsole } from '@angular/core';
import { _const } from '../constants/constants';
import { ConfiSystemDto } from '../models/interface/configurationSystemDto';
import { Helpers } from './helpers';


@Injectable()
export class Globalconst {
  _avatar: string = 'null';
  _userinfo: any = {};
  _resources: any = {};
  _noAvatar: string | undefined;
  _themeOption: any={};
  _systemOption: ConfiSystemDto | undefined;
  constructor() {
    this.reset();
  }

  reset() {
    this._noAvatar = _const.APP_CONFIG.no_avatar;
    this._resources = Helpers.getLocalStorage(_const.LOCAL_STORAGE.languages);
    this._userinfo = Helpers.getLocalStorage(_const.LOCAL_STORAGE.current_user);
    this._avatar = this._userinfo && this._userinfo.avartarThumbnail ? this._userinfo.avartarThumbnail : this._noAvatar;
  }
};
