﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Data.Authentication.EFCore.Models
{
    public partial class UserLogin
    {
        public int Id { get; set; }
        public DateOnly LoginAt { get; set; }
        public string ClientInfo { get; set; }
        public string IpAddress { get; set; }
        public int UserId { get; set; }
        public string DisplayName { get; set; }
        public string SystemCode { get; set; }
    }
}