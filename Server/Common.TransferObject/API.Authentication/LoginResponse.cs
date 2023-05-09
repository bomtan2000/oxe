namespace Common.TransferObject.API.Authentication
{
    public class LoginResponse
    {
        public AccessToken AccessToken { get; }

        public string RefreshToken { get; }

        public CurrentUser UserInfo { get; set; }

        public LoginResponse(AccessToken accessToken, string refreshToken, CurrentUser userInfo)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            UserInfo = userInfo;
        }
    }
}