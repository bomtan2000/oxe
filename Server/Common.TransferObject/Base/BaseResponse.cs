using System.Collections.Generic;
using System.Linq;

namespace Common.TransferObject.Base
{
    public class BaseResponse<T>
    {
        public BaseResponse()
        {
        }

        public BaseResponse(IEnumerable<ErrorResponse> errors)
        {
            Errors = errors;
        }

        public IEnumerable<ErrorResponse> Errors { get; set; }

        public bool Success => Errors == null || !Errors.Any();
        
        public T Content { get; set; }
    }
}
