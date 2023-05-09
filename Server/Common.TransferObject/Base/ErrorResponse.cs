
namespace Common.TransferObject.Base
{
    public sealed class ErrorResponse
    {
        public string Code { get; }
        public string Description { get; }

        public ErrorResponse()
        { 
        }

        public ErrorResponse(string code, string description)
        {
            Code = code;
            Description = description;
        }
    }
}
