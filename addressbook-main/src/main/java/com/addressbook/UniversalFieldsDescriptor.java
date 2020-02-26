package com.addressbook;

import com.addressbook.dto.ContactDto;
import com.addressbook.dto.OrganizationDto;
import com.addressbook.dto.PersonDto;
import com.addressbook.model.*;

import java.util.LinkedHashMap;
import java.util.Map;

public class UniversalFieldsDescriptor {

    public static final String ORGANIZATION_CACHE = "com.addressbook.model.Organization";
    public static final String PERSON_CACHE = "com.addressbook.model.Person";
    public static final String CONTACT_CACHE = "com.addressbook.model.Contact";
    public static final String MENU_CACHE = "com.addressbook.model.MenuEntry";
    public static final String USER_CACHE = "com.addressbook.model.User";
    public static final String LOCK_RECORD_CACHE = "java.lang.String";

    private static Map<String, FieldDescription> fieldDescriptionMapOrganization = new LinkedHashMap<>();
    private static Map<String, FieldDescription> fieldDescriptionMapPerson = new LinkedHashMap<>();
    private static Map<String, Map<String, FieldDescription>> fieldDescriptionMaps = new LinkedHashMap<>();
    private static Map<String, Class<?>> cacheClasses = new LinkedHashMap<>();
    private static Map<String, Class<?>> dtoClasses = new LinkedHashMap<>();

    static {
        fieldDescriptionMapOrganization.put("id",           new FieldDescription("id",          "ID",           "java.lang.String", "170px"));
        fieldDescriptionMapOrganization.put("name",         new FieldDescription("name",        "Name",         "java.lang.String", "170px"));
        fieldDescriptionMapOrganization.put("street",       new FieldDescription("street",      "Street",       "java.lang.String", "170px"));
        fieldDescriptionMapOrganization.put("zip",          new FieldDescription("zip",         "Zip",          "java.lang.Long",   "170px"));
        fieldDescriptionMapOrganization.put("type",         new FieldDescription("type",        "Type",         "java.lang.String", "170px"));
        fieldDescriptionMapOrganization.put("lastUpdated",  new FieldDescription("lastUpdated", "Last updated", "java.util.Date",   "170px"));

        fieldDescriptionMapPerson.put("id",         new FieldDescription("id",          "ID",           "java.lang.String", "170px"));
        fieldDescriptionMapPerson.put("orgId",      new FieldDescription("orgId",       "Organization", "java.lang.String", "170px"));
        fieldDescriptionMapPerson.put("firstName",  new FieldDescription("firstName",   "First name",   "java.lang.String", "170px"));
        fieldDescriptionMapPerson.put("lastName",   new FieldDescription("lastName",    "Last name",    "java.lang.String", "170px"));
        fieldDescriptionMapPerson.put("resume",     new FieldDescription("resume",      "Resume",       "java.lang.String", "170px"));
        fieldDescriptionMapPerson.put("salary",     new FieldDescription("salary",      "Salary",       "java.lang.String", "170px"));

        fieldDescriptionMaps.put(ORGANIZATION_CACHE, fieldDescriptionMapOrganization);
        fieldDescriptionMaps.put(PERSON_CACHE, fieldDescriptionMapPerson);

        cacheClasses.put(ORGANIZATION_CACHE, Organization.class);
        cacheClasses.put(PERSON_CACHE, Person.class);
        cacheClasses.put(CONTACT_CACHE, Contact.class);
        cacheClasses.put(MENU_CACHE, MenuEntry.class);
        cacheClasses.put(USER_CACHE, User.class);
        cacheClasses.put(LOCK_RECORD_CACHE, String.class);

        dtoClasses.put(ORGANIZATION_CACHE, OrganizationDto.class);
        dtoClasses.put(PERSON_CACHE, PersonDto.class);
        dtoClasses.put(CONTACT_CACHE, ContactDto.class);

    }

    public static Map<String, FieldDescription> getFieldDescriptionMap(String cache) {
        return fieldDescriptionMaps.get(cache);
    }

    public static Class<?> getCacheClass(String cache) {
        return cacheClasses.get(cache);
    }

    public static Map<String, Class<?>> getCacheClasses() {
        return cacheClasses;
    }

    public static Class<?> getDtoClass(String cache) {
        return dtoClasses.get(cache);
    }
}