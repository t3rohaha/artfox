namespace Web.Controllers.Admin;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests.Images;
using Services;
using Services.DTOs.Images;

[Authorize]
[Route("api/admin/images")]
public class AdminImagesController : ImagesController
{
    public AdminImagesController(ImagesService imagesService) : base(imagesService) {}

    [HttpPost]
    public async Task<IActionResult> UpdateAsync([FromForm]UpdateImagesRequest input)
    {
        try
        {
            var updateImagesDTO = await MapToUpdateImagesDTOAsync(input);
            var imagesDTO = await _imagesService.UpdateAsync(updateImagesDTO);
            return Ok(imagesDTO);
        }
        catch
        {
            var errorMessage = "An error occured while saving the images.";
            return StatusCode(500, errorMessage);
        }
    }

    private async Task<UpdateImagesDTO> MapToUpdateImagesDTOAsync(UpdateImagesRequest request)
    {
        var images = new List<UpdateImageDTO>();

        foreach(var image in request.Images)
        {
            images.Add(new UpdateImageDTO
            {
                ImageData = await ConvertToByteArrayAsync(image.ImageData),
                DisplayOrder = image.DisplayOrder
            });
        }

        return new UpdateImagesDTO
        {
            ArtworkId = request.ArtworkId,
            Images = images
        };
    }

    private async Task<byte[]> ConvertToByteArrayAsync(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }
}