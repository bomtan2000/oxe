using System.Security.Claims;

namespace Common.JwtAuthenticationManager
{
    public interface IJwtTokenValidator
    {
        ClaimsPrincipal GetPrincipalFromToken(string token, string signingKey);
    }
}
