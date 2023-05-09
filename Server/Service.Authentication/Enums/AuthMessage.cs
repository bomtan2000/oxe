namespace Service.Authentication
{
    public sealed class AuthMessage
    {
        public const string INVALID_TOKEN = "Invalid token";
        public const string TOKEN_IS_EXPIRED = "Token is expired.";
        public const string SYSTEM_IS_INACTIVE = "System is inactive.";
        public const string TOKEN_NOT_FOUND = "Token not found (NULL).";
        public const string SYSTEM_SHOULD_BE_SENT = "SystemId should be sent.";
        public const string ACCOUNT_LOCKED = "Your account has been locked out";
        public const string SYSTEM_NOT_REGISTER = "System '{0}' is not registered in the system.";
        public const string REFRESH_TOKEN_DOES_NOT_EXIST = "Refresh token does not exist";
        public const string ACCOUNT_INACTIVE = "User has been inactive. Please contact with administrator";
        public const string WARNING_BEFORE_LOCK_OUT = "Invalid credentials.You have {0} more attempt(s) before your account gets locked out.";
        public const string INVALID_CREDENTIALS = "The user name or password is incorrect.";
        public const string ERROR_OCCURS_GENERATE_REFRESH_TOKEN = "Error occur while generate refresh token !";
    }

    public sealed class AuthErrorCode
    {        
        public const string INVALID_USER = "invalid_user";
        public const string INACTIVE_USER = "user_inactive";
        public const string ACCOUNT_LOCKED = "account_locked";
        public const string INVALID_SYSTEM = "invalid_systemId";
        public const string WARNING_BEFORE_ACCOUNT_LOCKED = "warning_before_lock_out";
    }
}
