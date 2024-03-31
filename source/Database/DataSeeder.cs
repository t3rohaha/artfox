using Database.Models;

namespace Database;

public class DataSeeder
{
    private readonly Context _context;

    public DataSeeder(Context context)
    {
        _context = context;
    }

    public void Seed()
    {
        
        for (var i = 1; i <= 12; i++)
        {
            _context.Artworks.Add(new Artwork
            {
                Id = $"artwork{i}",
                Title = $"Name of Artwork {i}",
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                Price = 79.99M,
                SizesJSON = "[]",
                CreatedAt = DateTime.UtcNow
            });

            _context.ArtworkImages.Add(new ArtworkImage
            {
                Id = $"image{i}",
                ArtworkId = $"artwork{i}",
                ImageData = File.ReadAllBytes($"../Database/ArtworkImages/artwork{i}.jpeg"),
                DisplayOrder = 0
            });
        }

        _context.SaveChanges();
    }
}