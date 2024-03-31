namespace Database.Models;

public class ArtworkImage
{
    public required string Id { get; set; }
    public required string ArtworkId { get; set; }
    public required byte[] ImageData { get; set; }
    public required int DisplayOrder { get; set; }

    // Navigational properties
    public Artwork? Artwork { get; set; }
}