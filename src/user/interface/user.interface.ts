import { StudentEntity } from "src/students/entities/students.entity"

export interface User {
    id: number
    tax_id: string
    name: string
    email: string
    password: string
    role: string
}

export function createUser(student: StudentEntity){
    return {id: student.id, tax_id: student.tax_id}
}