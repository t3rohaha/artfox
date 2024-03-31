namespace Web.Controllers;

using Microsoft.AspNetCore.Mvc;
using Services;

[ApiController]
[Route("api/artworks")]
public class ArtworksController : ControllerBase
{
    protected readonly ArtworksService _artworkService;

    public ArtworksController(ArtworksService artworkService)
    {
        _artworkService = artworkService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync(string id)
    {
        try
        {
            var artwork =  await _artworkService.GetAsync(id);

            if (artwork == null)
            {
                return NotFound();
            }

            return Ok(artwork);
        }
        catch
        {
            var errorMessage = "An error occured while fetching artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        try
        {
            var artworks = await _artworkService.GetAllAsync();
            return Ok(artworks);
        }
        catch
        {
            var errorMessage = "An error occured while fetching artworks.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet("random/{count}")]
    public async Task<IActionResult> GetRandomAsync(int count)
    {
        try
        {
            if (count < 1)
            {
                return BadRequest();
            }

            var artworks = await _artworkService.GetRandomAsync(count);
            return Ok(artworks);
        }
        catch
        {
            var errorMessage = "An error occured while fetching artworks.";
            return StatusCode(500, errorMessage);
        }
    }
}