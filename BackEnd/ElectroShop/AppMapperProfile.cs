using AutoMapper;
using ElectroShop.DTO;
using ElectroShop.Models;

namespace ElectroShop;

public class AppMapperProfile : Profile
{
    public AppMapperProfile()
    {
        CreateMap<CustomerDto, Customer>();
        CreateMap<CustomerAddressesDto, CustomerAddresses>();
        CreateMap<ConversationDTO, Conversation>();
        CreateMap<MessageDTO, Message>();
        CreateMap<EmployeeDto, Employee>();
        CreateMap<EmployeeDetailsDto, EmployeeDetails>();
        CreateMap<EmployeeDetails, EmployeeDetailsDto>();

        CreateMap<AssetDto, Asset>();
        CreateMap<AssetTypeDto, AssetType>();
    }
}
