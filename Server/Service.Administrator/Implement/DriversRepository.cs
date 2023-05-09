using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;
using Service.Core;

namespace Service.Administrator.Implement
{
    public class DriverRepository : GenericRepository<Drivers>, IDriversRepository
    {
        private readonly IMapper _mapper;

        public DriverRepository(SSOMasterContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task DeleteDriver(DeleteDriver driver)
        {
            await this.GetById(driver.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;
                    updateUser.IsValid = '0';
                    updateUser.UpdateDate = driver.UpdateDate;
                    updateUser.UpdatedBy = driver.UpdateBy;

                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<Drivers> GetDriver(int id)
        {
            return await this.GetById(id);
        }

        public async Task InsertDriver(AddDriver driver)
        {
            var newDriver = _mapper.Map<Drivers>(driver);
            await this.AddAsync(newDriver); 
        }

        public async Task<IEnumerable<Drivers>> GetDrivers(GetAllDriver driver)
        {
            var getAll = ((SSOMasterContext)_dbContext).Drivers.Where(x => x.IsValid.Equals('1')
                                                  && (string.IsNullOrEmpty(driver.DriverName) || (!string.IsNullOrEmpty(driver.DriverName) && x.DriverName.Contains(driver.DriverName)))
                                                  && (string.IsNullOrEmpty(driver.PhoneNumber) || (!string.IsNullOrEmpty(driver.PhoneNumber) && x.MobileNo.Equals(driver.PhoneNumber))));
            return getAll;
        }

        public async Task UpdateDriver(UpdateDriver driver)
        {
            await this.GetById(driver.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateDriver = res.Result;
                    updateDriver.DriverName = driver.DriverName;
                    updateDriver.MobileNo = driver.MobileNo;
                    updateDriver.UpdateDate = driver.UpdateDate;
                    updateDriver.UpdatedBy = driver.UpdateBy;
                    updateDriver.Dob = driver.Dob;
                    updateDriver.Remark = driver.Remark;
                    updateDriver.LicenseClass = driver.LicenseClass;
                    updateDriver.DriverIcno = driver.DriverIcno;
                    updateDriver.EquipemtType = driver.EquipemtType;
                    updateDriver.PlateNumber= driver.PlateNumber;
                    updateDriver.LicenseClass = driver.LicenseClass;
                    updateDriver.CompanyId= driver.CompanyId;
                    updateDriver.ReferenceUserId = driver.ReferenceUserId;
                    await this.UpdateAsync(updateDriver);
                }
            });
        }
    }
}