namespace Database.Models;

public class CartItem
{
    public required string Id { get; set; }
    public required string CartId { get; set; }
    public required string ArtworkId { get; set; }
    public required int Quantity { get; set; }

    // Navigational properties
    public Cart? Cart { get; set; }
    public Artwork? Artwork { get; set; }
}