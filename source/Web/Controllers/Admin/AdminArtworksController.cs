namespace Web.Controllers.Admin;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests.Artworks;
using Services;
using Services.DTOs.Artworks;
using Web.Controllers;

[Authorize]
[Route("api/admin/artworks")]
public class AdminArtworksController : ArtworksController
{
    public AdminArtworksController(ArtworksService artworkService) : base(artworkService) {}

    [HttpPost]
    public async Task<IActionResult> CreateAsync(CreateArtworkRequest input)
    {
        try
        {
            var dto = MapToCreateArtworkDTO(input);
            var artwork = await _artworkService.CreateAsync(dto);
            return Created($"http://localhost:5000/api/artworks", artwork);
        }
        catch
        {
            var errorMessage = "An error occured while saving the artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        try
        {
            await _artworkService.DeleteAsync(id);
            return Ok(new { Success = true });
        }
        catch
        {
            var errorMessage = "An error occured while deleting the artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(UpdateArtworkRequest input)
    {
        try
        {
            if (!await _artworkService.ExistsAsync(input.Id))
            {
                return NotFound();
            }

            var dto = MapToUpdateArtworkDTO(input);
            var artwork = await _artworkService.UpdateAsync(dto);
            return Ok(artwork);
        }
        catch
        {
            var errorMessage = "An error occured while adding sizes to artwork.";
            return StatusCode(500, errorMessage);
        }
    }

    private CreateArtworkDTO MapToCreateArtworkDTO(CreateArtworkRequest request)
    {
        return new CreateArtworkDTO
        {
            Title = request.Title,
            Description = request.Description,
            Price = request.Price,
            Sizes = request.Sizes
                .Select(x => new SizeDTO
                {
                    Width = x.Width,
                    Height = x.Height
                })
                .ToList()
        };
    }

    private UpdateArtworkDTO MapToUpdateArtworkDTO(UpdateArtworkRequest request)
    {
        return new UpdateArtworkDTO
        {
            Id = request.Id,
            Title = request.Title,
            Description = request.Description,
            Price = request.Price,
            Sizes = request.Sizes
                .Select(x => new SizeDTO
                {
                    Width = x.Width,
                    Height = x.Height
                })
                .ToList()
        };
    }
}