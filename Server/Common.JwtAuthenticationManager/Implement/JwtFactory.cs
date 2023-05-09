using Common.TransferObject.API.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Common.JwtAuthenticationManager
{
    public sealed class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly IJwtTokenHandler _jwtTokenHandler;

        public JwtFactory(IJwtTokenHandler jwtTokenHandler, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
            _jwtTokenHandler = jwtTokenHandler;
        }

        public async Task<AccessToken> GenerateEncodedToken(LoginRequest userInfo, string secret, int tokenLifeTime)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userInfo.UserName),
                new Claim("SystemId", userInfo.SystemId)
            };

            var key = Convert.FromBase64String(secret);
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                claims,
                _jwtOptions.NotBefore,
                _jwtOptions.Expiration, 
                signingCredentials);

            return await Task.Run(() => new AccessToken(_jwtTokenHandler.WriteToken(jwt), (int)_jwtOptions.ValidFor.TotalSeconds));
        }
    }
}