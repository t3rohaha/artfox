namespace Services;

using Database;
using Database.Models;
using Services.DTOs.Images;
using Microsoft.EntityFrameworkCore;

public class ImagesService
{
    private readonly Context _context;

    public ImagesService(Context context)
    {
        _context = context;
    }

    public async Task<ImageDTO[]> GetAsync(string artworkId)
    {
        var artwork = await _context.Artworks
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == artworkId);

        if (artwork == null)
        {
            throw new Exception("Artwork not found.");
        }

        var imagesDTO = artwork.Images.Select(x => MapToImageDTO(x));

        return imagesDTO.ToArray();
    }

    public async Task<ImageDTO> GetMainAsync(string artworkId)
    {
        var artwork = await _context.Artworks
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == artworkId);

        if (artwork == null)
        {
            throw new Exception("Artwork not found.");
        }

        var mainImage = artwork.Images.FirstOrDefault(x => x.DisplayOrder == 0);

        if (mainImage == null)
        {
            throw new Exception("Artwork don't have images.");
        }
        
        return MapToImageDTO(mainImage);
    }

    public async Task<ImageDTO[]> UpdateAsync(UpdateImagesDTO input)
    {
        var artwork = await _context.Artworks
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == input.ArtworkId);

        if (artwork == null)
        {
            throw new Exception("Artwork not found.");
        }

        // Remove existing images
        _context.ArtworkImages.RemoveRange(artwork.Images);

        // Add new images
        foreach(var image in input.Images)
        {
            artwork.Images.Add(new ArtworkImage
            {
                Id = Guid.NewGuid().ToString(),
                ArtworkId = artwork.Id,
                ImageData = image.ImageData,
                DisplayOrder = image.DisplayOrder
            });
        }

        await _context.SaveChangesAsync();

        return await GetAsync(artwork.Id);
    }

    private ImageDTO MapToImageDTO(ArtworkImage image)
    {
        return new ImageDTO
        {
            ImageId = image.Id,
            ArtworkId = image.ArtworkId,
            ImageData = image.ImageData,
            DisplayOrder = image.DisplayOrder
        };
    }
}