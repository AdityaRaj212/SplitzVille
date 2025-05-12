import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Group {
  id: string;
  name: string;
  image?: string;
  initials: string;
  memberCount: number;
  balance: number;
}

interface GroupListProps {
  className?: string;
  groups: Group[];
}

export const GroupList = ({ className, groups }: GroupListProps) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">My Groups</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/groups">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <Link to={`/groups/${group.id}`} key={group.id} className="block">
              <div className="group-card overflow-hidden hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-primary/20 rounded-lg">
                <div className="flex items-center p-4 gap-4">
                  <Avatar className="h-12 w-12 bg-primary/10 animate-pulse-slow">
                    <AvatarImage src={group.image} alt={group.name} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-600 text-white">
                    {group.name.includes(' ')
                    ? `${group.name.split(' ')[0][0]}${group.name.split(' ').slice(-1)[0][0]}`.toUpperCase()
                    : group.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{group.name}</h3>
                    <p className="text-xs text-muted-foreground">{group?.members?.length} members</p>
                  </div>
                  <div className="flex flex-col items-end">
                    {/* <span className={cn(
                      "text-sm font-medium px-2 py-1 rounded-full",
                      group.balance > 0 ? "bg-green-100 text-green-800" : 
                      group.balance < 0 ? "bg-red-100 text-red-800" : 
                      "bg-gray-100 text-gray-800"
                    )}>
                      {group.balance > 0 ? '+' : ''}{group.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="group-card flex items-center justify-center p-8 border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors duration-200 rounded-lg">
            <Button variant="ghost" className="flex flex-col gap-2 hover:scale-105 transition-transform">
              <PlusCircle className="h-8 w-8 text-primary" />
              <span className="text-primary font-medium">Create Group</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupList;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { PlusCircle } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Badge } from '@/components/ui/badge';

// interface Group {
//   id: string;
//   name: string;
//   image?: string;
//   initials: string;
//   memberCount: number;
//   balance: number;
// }

// interface GroupListProps {
//   className?: string;
//   groups: Group[];
// }

// export const GroupList = ({ className, groups }: GroupListProps) => {
//   return (
//     <Card className={cn("shadow-sm", className)}>
//       <CardHeader className="pb-2 flex flex-row items-center justify-between">
//         <CardTitle className="text-lg font-medium">My Groups</CardTitle>
//         <Button variant="ghost" size="sm" asChild>
//           <Link to="/groups">View all</Link>
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {groups.map((group) => (
//             <div key={group.id} className="group-card overflow-hidden">
//               <div className="flex items-center p-4 gap-4">
//                 <Avatar className="h-12 w-12 bg-primary/10">
//                   <AvatarImage src={group.image} alt={group.name} />
//                   <AvatarFallback>{group.name[0]}</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <h3 className="font-medium">{group.name}</h3>
//                   <p className="text-xs text-muted-foreground">{group.members.length} members</p>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   {/* <span className={cn(
//                     "balance-pill",
//                     group.balance > 0 ? "balance-pill-owed" : 
//                     group.balance < 0 ? "balance-pill-owe" : 
//                     "balance-pill-neutral"
//                   )}>
//                     {group.balance > 0 ? '+' : ''}{group.balance.toLocaleString('en-US', {
//                       style: 'currency',
//                       currency: 'USD',
//                     })}
//                   </span> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="group-card flex items-center justify-center p-8 border-dashed">
//             <Button variant="ghost" className="flex flex-col gap-2">
//               <PlusCircle className="h-8 w-8" />
//               <span>Create Group</span>
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default GroupList;
