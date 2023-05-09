using Common.TransferObject.API.Authentication;
using System.Threading.Tasks;

namespace Common.JwtAuthenticationManager
{
    public interface IJwtFactory
    {
        Task<AccessToken> GenerateEncodedToken(LoginRequest userInfo, string secret, int tokenLifeTime);
    }
}
