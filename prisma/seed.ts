import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
    await prisma.roles.createMany({
      data: [{ 'roleName': 'Admin', 'createdBy': 'Admin', 'updatedBy': 'Admin'  }, { 'roleName': 'Super Admin', 'createdBy': 'Admin', 'updatedBy': 'Admin' }],
      skipDuplicates: true,
    });

    await prisma.module.createMany({
      data: [{ 'feature': 'Home', 'uri': '/', 'description': '',  'parentId': 0, 'treeStatus': 'H', 'createdBy': 'Admin', 'updatedBy': 'Admin', 'sequence': 100 },
             { 'feature': 'Admin Management', 'uri': '#', 'description': '', 'parentId': 0, 'treeStatus': 'H', 'createdBy': 'Admin', 'updatedBy': 'Admin', 'sequence': 300 },           
             { 'feature': 'Roles', 'uri': '/roles', 'description': '', 'parentId': 7, 'treeStatus': 'D', 'createdBy': 'Admin', 'updatedBy': 'Admin', 'sequence': 320 },           
             { 'feature': 'Roles Permission', 'uri': '/roles-permission', 'description': '', 'parentId': 7, 'treeStatus': 'D', 'createdBy': 'Admin', 'updatedBy': 'Admin', 'sequence': 330},             
    ],
      skipDuplicates: true,
    })

    await prisma.modulePermission.createMany({
      data: [
        {"roleId": 3, 'modulId': 1, "createRight": 0, "readRight": 1, "updateRight": 0, "deleteRight": 0, "inactiveRight": 0, 'createdBy': 'Admin', 'updatedBy': 'Admin' },
        {"roleId": 3, 'modulId': 2, "createRight": 0, "readRight": 1, "updateRight": 0, "deleteRight": 0, "inactiveRight": 0, 'createdBy': 'Admin', 'updatedBy': 'Admin' },
        {"roleId": 3, 'modulId': 3, "createRight": 1, "readRight": 0, "updateRight": 1, "deleteRight": 1, "inactiveRight": 3, 'createdBy': 'Admin', 'updatedBy': 'Admin' },
        {"roleId": 3, 'modulId': 4, "createRight": 1, "readRight": 0, "updateRight": 1, "deleteRight": 1, "inactiveRight": 0, 'createdBy': 'Admin', 'updatedBy': 'Admin' },
        {"roleId": 2, 'modulId': 1, "createRight": 0, "readRight": 1, "updateRight": 0, "deleteRight": 0, "inactiveRight": 0, 'createdBy': 'Admin', 'updatedBy': 'Admin' },
        {"roleId": 1, 'modulId': 1, "createRight": 0, "readRight": 1, "updateRight": 0, "deleteRight": 0, "inactiveRight": 0, 'createdBy': 'Admin', 'updatedBy': 'Admin' },
    ],
      skipDuplicates: true,
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });  