
namespace Common.JwtAuthenticationManager
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(string username, string password);
    }
}
