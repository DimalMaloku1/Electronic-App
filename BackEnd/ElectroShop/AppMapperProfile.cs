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
    }
}

