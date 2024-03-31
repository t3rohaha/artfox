namespace Requests.Images;

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

public class UpdateImageRequest
{
    [Required]
    public required IFormFile ImageData { get; set; }
    [Required]
    public required int DisplayOrder { get; set; }
}