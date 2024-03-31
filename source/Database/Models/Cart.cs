namespace Database.Models;

public class Cart
{
    public required string Id { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public required DateTimeOffset ModifiedAt { get; set; }

    // Navigational properties
    public List<CartItem> Items { get; set; } = new List<CartItem>();
}