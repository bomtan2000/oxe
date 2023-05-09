
namespace Common.JwtAuthenticationManager
{
    public interface ITokenFactory
    {
        string GeneraterRefreshToken(int size = 32);
    }
}