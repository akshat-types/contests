function role(roles,checkrole,action){
    return roles[checkrole].includes(action)
}

roles={ admin:["read","write"], user:["read"], staff: ["write"]}
checkRole="user",
action="read"

console.log(role(roles,checkRole,action))