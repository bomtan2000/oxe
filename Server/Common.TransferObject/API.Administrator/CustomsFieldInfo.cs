using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Administrator
{
    public class CustomsFieldInfo
    {
        public string DatabaseName { get; set; }
        public string TableObject { get; set; }
        public string ColumnObject { get; set; }
        public string FieldDesc { get; set; }
        public string FieldType { get; set; }
        public string FieldOptions { get; set; }
        public string DefaultValue { get; set; }
        public string Remarks { get; set; }
    }
    public class DeleteCustom
    {
        [Required]
        public int Id { get; set; }

        public int UpdateBy { get; set; }
    }

    public class GetAllCustomField
    {
        public string DatabaseName { get; set; }
        public string TableObject { get; set; }
        public string ColumnObject { get; set; }
    }
    
    public class UpdateCustom
    {
        [Required]
        public int Id { get; set; }
        public string DatabaseName { get; set; }
        public string TableObject { get; set; }
        public string ColumnObject { get; set; }
        public string FieldDesc { get; set; }
        public string FieldType { get; set; }
        public string FieldOptions { get; set; }
        public string DefaultValue { get; set; }
        public string Remarks { get; set; }
    }
}
