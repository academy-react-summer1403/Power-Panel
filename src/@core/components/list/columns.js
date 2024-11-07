// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.length > 0) {
    return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color} className='me-50' content={row.client ? row.client.name : 'John Doe'} initials />
  }
}

// ** Table columns
export const columns = [
  {
    name: 'id',
    sortable: true,
    sortField: 'id',
    minWidth: '50px',
    // selector: row => row.id,
    cell: row => <Link to={`/apps/invoice/preview/${row.id}`}>{`${row.id}`}</Link>
  },
  {
    sortable: true,
    minWidth: '200px',
    sortField: 'invoiceStatus',
    name: "pictureAddress",
    // selector: row => row.invoiceStatus,
    cell: row => {
      return (
          <Avatar img={`${row.pictureAddress}`}  />

      )
    }
  },
  {
    name: 'name and email',
    sortable: true,
    minWidth: '350px',
    sortField: 'client.name',
    // selector: row => row.client.name,
    cell: row => {
      const name = row.client ? row.client.name : `${row.fname}`
      const LastName = row.client ? row.client.LastName : `${row.lname}`,
        email = row.client ? row.client.companyEmail : `${row.gmail}`
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name} {LastName} </h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'phoneNumber',
    sortable: true,
    minWidth: '200px',
    sortField: 'total',
    // selector: row => row.total,
    cell: row => {
      const phoneNumber = row.client ? row.client.phoneNumber: `${row.phoneNumber}`
      return(
          <h5> {phoneNumber} </h5>
      )
    }
  },
  {
    minWidth: '200px',
    name: 'InsertDate',
    cell: row =>  {
      const InsertDate = row.client ? row.client.InsertDate : `${row.insertDate}`
      return(
              <h6> {InsertDate} </h6>
      )
    }
  },
  {
    name: 'Is Student',
    minWidth: '130px',
    cell: row => {
      const IsStudent = `${row.isStudent}`
      return (
          <h5> {IsStudent} </h5>
      )
    }
  },
  {
    name:"Is Teacher",
    minWidth:"130px",
    cell: row => {
      const IsTeacher = `${row.isTeacher}`
        return(
          <h5> {IsTeacher} </h5>
        )
    }
  },
  {
    name:"profileCompletionPercentage",
    minWidth:"300px",
    cell: row => {
      const Complet = `%${row.profileCompletionPercentage}`
        return(
          <h5> {Complet} </h5>
        )
    }
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send className='cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='me-50' />
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
              }}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='me-50' />
              <span className='align-middle'>Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
