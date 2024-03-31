namespace Database.Models;

public class OrderItem
{
    public required string Id { get; set; }
    public required string OrderId { get; set; }
    public required string ArtworkId { get; set; }
    public required int Quantity { get; set; }

    // Navigational properties
    public Order? Order { get; set; }
    public Artwork? Artwork { get; set; }
}