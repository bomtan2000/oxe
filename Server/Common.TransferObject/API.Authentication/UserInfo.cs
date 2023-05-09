using System;
using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Authentication
{
    public class UserPassword
    {
        [Required]
        public string UserName { get; set; }
        public string UpdatedBy { get; set; }
        [Required, DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        public string IpAddress { get; set; }
        [Required]
        public string SystemId { get; set; }
    }

    public class ResetPass
    {
        [Required]
        public string LoginId { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

    public class UserDelete
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UpdatedBy { get; set; }
        [Required]
        public DateTime? UpdateDate { get; set; }
    }

    public class AddUser
    {
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string LoginId { get; set; }
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }
        public string MobileNo { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        public string Pwd { get; set; }
    }

    public class GetAllUser
    {
        [Required]
        public string LoginId { get; set; }
        public string DisplayName { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class UpdateUser
    {
        [Required]
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        public string MobileNo { get; set; }

        public string RegType { get; set; }
        [Required]
        public int UpdatedBy { get; set; }
        [Required]
        public DateTime? UpdateDate { get; set; }
    }

    public class LoginRequestToken
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string LoginId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string MobileNo { get; set; }

        public string RegType { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public int? CreatedBy { get; set; }

        public int? UpdatedBy { get; set; }

        [Required]
        public string Pwd { get; set; }
    }
}