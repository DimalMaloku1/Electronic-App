namespace ElectroShop.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        public DateTime ProductionDate { get; set; }
        public int AssetTypeId { get; set; }
        public AssetType AssetType { get; set; } // Navigation property
    }
}
