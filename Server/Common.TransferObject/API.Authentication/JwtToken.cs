using System.Collections.Generic;
using System.Security.Claims;
using System;

namespace Common.TransferObject.API.Authentication
{
    public class JwtToken
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public IEnumerable<Claim> Claims { get; set; }
        public DateTime Expiry { get; set; }
        public string UserName { get; set; }
        public string SystemId { get; set; }
    }
}
