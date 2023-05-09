using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;
using Service.Core;

namespace Service.Administrator.Implement
{
    public class ClientRepository : GenericRepository<Clients>, IClientRepository
    {
        private readonly IMapper _mapper;

        public ClientRepository(SSOMasterContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task DeleteClient(DeleteClient client)
        {
            await this.GetById(client.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;
                    updateUser.IsValid = '0';
                    updateUser.UpdateDate = client.UpdateDate;
                    updateUser.UpdatedBy = client.UpdateBy;

                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<Clients> GetClient(int id)
        {
            return await this.GetById(id);
        }

        public async Task InsertClient(AddClient client)
        {
            var newClient = _mapper.Map<Clients>(client);
            await this.AddAsync(newClient);
        }
        public async Task<IEnumerable<Clients>> GetClients(GetAllClient client)
        {
            var getAll = ((SSOMasterContext)_dbContext).Clients.Where(x => x.IsValid.Equals('1')
                                                  && (string.IsNullOrEmpty(client.ClientName) || (!string.IsNullOrEmpty(client.ClientName) && x.ClientName.Contains(client.ClientName)))
                                                  && (string.IsNullOrEmpty(client.Phone) || (!string.IsNullOrEmpty(client.Phone) && x.MobileNo.Equals(client.Phone))));
            return getAll;
        }

        public async Task UpdateClient(UpdateClient client)
        {
            await this.GetById(client.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateClient = res.Result;
                    updateClient.ClientName = client.ClientName;
                    updateClient.Address = client.Address;
                    updateClient.PostalCode = client.PostalCode;
                    updateClient.ContactPerson = client.ContactPerson;
                    updateClient.MobileNo = client.MobileNo;
                    updateClient.Country = client.Country;
                    updateClient.CompanyId = client.CompanyId;
                    updateClient.UpdatedByName = client.UpdatedByName;
                    updateClient.Remark = client.Remark;
                    await this.UpdateAsync(updateClient);
                }
            });
        }
    }
}