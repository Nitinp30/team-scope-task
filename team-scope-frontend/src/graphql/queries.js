// queries.js
import { gql } from '@apollo/client';

export const LIST_EMPLOYEES = gql`
  query {
    listEmployees {
    id
    name
    email
    phone
    position
    department
    salary
    joinDate
    address
    avatar
    status
    }
  }
`;

export const PAGINATED_EMPLOYEES = gql`
  query paginatedEmployees($page: Int!, $limit: Int!, $sortBy: String) {
    paginatedEmployees(page: $page, limit: $limit, sortBy: $sortBy) {
      name
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    getEmployee(id: $id) {
    id
    name
    email
    phone
    position
    department
    salary
    joinDate
    address
    avatar
    status
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $position: String
    $department: String
    $salary: String
    $joinDate: String
    $address: String
    $avatar: String
    $status: String
  ) {
    updateEmployee(
      id: $id
      name: $name
      email: $email
      phone: $phone
      position: $position
      department: $department
      salary: $salary
      joinDate: $joinDate
      address: $address
      avatar: $avatar
      status: $status
    ) {
      id
      name
    }
  }
`;