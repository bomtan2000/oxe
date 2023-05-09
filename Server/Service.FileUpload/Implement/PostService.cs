using Service.Core;
using Common.TransferObject.FileUpload;
using Minio.Exceptions;
using Amazon.S3;
using Amazon.S3.Model;
using Minio;

namespace Service.FileUpload
{
    public class PostService : IPostService
    {
        public async Task<string> UploadAvatar(AvatarModel avatarModel, string filePath)
        {
            var uniqueFileName = filePath.GetUniqueFileName(avatarModel.CompanyShortCode, avatarModel.LoginId);
            try
            {

                var endpoint = "objstorage.mplogistics.vn:9000";
                var accessKey = "T6z8DPoC3I0o9gmi";
                var secretKey = "V7U0dUGQtdZN1LAoQpfPTdOiIjPFbKQQ";
                var secure = true;
                var contentType = $"image/{Path.GetExtension(filePath).Replace(".", "")}";
                var bucketName = "auth";

                //var minioClient = new MinioClient()
                //                        .WithEndpoint(endpoint)
                //                        .WithCredentials(accessKey, secretKey)
                //                        .WithSSL(secure)
                //                        .Build();


                Stream fileToUpload = avatarModel.AvatarFile.OpenReadStream();
                {
                    var putObjectRequest = new PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = uniqueFileName,
                        InputStream = fileToUpload,
                        ContentType = $"image/{Path.GetExtension(filePath).Replace(".", "")}"
                    };

                    var response = await IAmazonS3.PutObjectAsync(putObjectRequest);
                }

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = uniqueFileName,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddHours(3600)
                };
                string url = await AmazonS3Client.GetPreSignedURL(request);

                return url;
                //// Make a bucket on the server, if not already present.
                //var beArgs = new BucketExistsArgs().WithBucket(bucketName);
                //bool found = await minioClient.BucketExistsAsync(beArgs).ConfigureAwait(false);
                //if (!found)
                //{
                //    var mbArgs = new MakeBucketArgs().WithBucket(bucketName);
                //    await minioClient.MakeBucketAsync(mbArgs).ConfigureAwait(false);
                //}

                //// Upload a file to bucket.
                //var putObjectArgs = new PutObjectArgs()
                //                      .WithBucket(bucketName)
                //                      .WithObject(uniqueFileName)
                //                      .WithContentType(contentType) //Object Name
                //                      .WithFileName(filePath); //Path we choose

                //await minioClient.PutObjectAsync(putObjectArgs);


                //var presignedObjectArgs = new PresignedGetObjectArgs()
                //        .WithBucket(bucketName)
                //        .WithObject(uniqueFileName)
                //        .WithExpiry(60 * 60 * 24);

                //var url = await minioClient.PresignedGetObjectAsync(presignedObjectArgs).ConfigureAwait(true);

                //return url;
            }
            catch (MinioException ex)
            {
                Console.WriteLine($"[Bucket]  Exception: {ex}");
            }
            return "";
        }
    }
}