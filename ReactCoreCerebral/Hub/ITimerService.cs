using System.Threading;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public interface ITimerService
    {
        Task StartAsync(CancellationToken cancellationToken);
        Task StopAsync(CancellationToken cancellationToken);
    }
}