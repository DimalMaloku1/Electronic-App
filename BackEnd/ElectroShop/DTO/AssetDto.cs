namespace ElectroShop.DTO
{
    public class AssetDto
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        public DateTime ProductionDate { get; set; }
        public int AssetTypeId { get; set; }
        public string AssetTypeName { get; set; }
    }
}
