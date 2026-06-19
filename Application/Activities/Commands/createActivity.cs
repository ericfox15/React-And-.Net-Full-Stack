using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Activities.Add(request.Activity);
                await context.SaveChangesAsync(cancellationToken);
                return request.Activity.Id;
            }
        }
    }
}
              