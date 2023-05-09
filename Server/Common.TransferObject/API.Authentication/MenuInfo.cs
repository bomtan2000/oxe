using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Authentication
{
    public class GetAllMenu
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string SystemCode { get; set; }
    }

    public class AddMenu
    {
        public string MenuCode { get; set; }
        public string MenuName { get; set; }
        public string SystemCode { get; set; }
        public string PageCode { get; set; }
        public char? IsGroup { get; set; }
        public string ParentMenu { get; set; }
        public string Icon { get; set; }
    }

    public class MenuRes
    {
        public string MenuCode { get; set; }
        public string MenuName { get; set; }
        public string PageCode { get; set; }
        public char? IsGroup { get; set; }
        public string ParentMenu { get; set; }
        public char? New { get; set; }
        public char? Search { get; set; }
        public char? Store { get; set; }
        public char? Export { get; set; }
        public char? Preview { get; set; }
        public char? Del { get; set; }
        public char? Plan { get; set; }
        public char? Run { get; set; }
    }
}