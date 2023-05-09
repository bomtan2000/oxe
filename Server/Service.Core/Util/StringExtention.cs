using System;
using System.IO;

namespace Service.Core
{
    public static class StringExtention
    {
        public static string GetUniqueFileName(this string fileName, string companyCode, string userName)
        {
            var fileType = Path.GetExtension(fileName);
            fileName = Path.GetFileNameWithoutExtension(fileName);
        
            return companyCode + "/" + $"{fileName}_{companyCode}_{userName}_{Guid.NewGuid().ToString().AsSpan(0, 4)}{fileType}";
        }
    }
}