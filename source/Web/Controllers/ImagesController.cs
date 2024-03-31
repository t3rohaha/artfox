namespace Web.Controllers;

using Microsoft.AspNetCore.Mvc;
using Services;

[ApiController]
[Route("api/images")]
public class ImagesController : ControllerBase
{
    protected readonly ImagesService _imagesService;

    public ImagesController(ImagesService imagesService)
    {
        _imagesService = imagesService;
    }

    [HttpGet("{artworkId}")]
    public async Task<IActionResult> GetAsync(string artworkId)
    {
        try
        {
            var imagesDTO = await _imagesService.GetAsync(artworkId);
            return Ok(imagesDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching images.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet("main/{artworkId}")]
    public async Task<IActionResult> GetMainAsync(string artworkId)
    {
        try
        {
            var mainImageDTO = await _imagesService.GetMainAsync(artworkId);
            return Ok(mainImageDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching main image.";
            return StatusCode(500, errorMessage);
        }
    }
}