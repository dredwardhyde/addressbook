package com.addressbook.model

import dev.morphia.annotations.Entity
import dev.morphia.annotations.Id
import org.apache.ignite.cache.query.annotations.QuerySqlField
import java.io.Serializable

@Entity("users")
class User(login: String, password: String, roles: List<String>) : Serializable {

    @Id
    @QuerySqlField(index = true)
    var login: String? = login

    @QuerySqlField(index = true)
    var password: String? = password

    var roles: List<String>? = roles

}
