namespace Database.Models;

public class Artwork
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required decimal Price { get; set; }
    public required string SizesJSON { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? ModifiedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    // Navigational properties
    public List<ArtworkImage> Images { get; set; } = new List<ArtworkImage>();
    public List<CartItem> Carts { get; set; } = new List<CartItem>();
    public List<OrderItem> Orders { get; set; } = new List<OrderItem>();
}