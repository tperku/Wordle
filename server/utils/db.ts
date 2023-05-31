import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Query ${params.model}.${params.action} took ${after - before}ms`
    )

    return result
})

export default prisma
