using ChildVaccineSystem.RepositoryContract.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Repository.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
