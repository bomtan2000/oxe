using System;
using System.Security.Cryptography;

namespace Common.JwtAuthenticationManager
{
    public class TokenFactory : ITokenFactory
    {
        public string GeneraterRefreshToken(int size = 32)
        {
            var randomNumber = new byte[size];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
